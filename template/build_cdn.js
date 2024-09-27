const upyun = require('upyun');
const fs = require('fs');

const service = new upyun.Service('bucket', 'operator', 'password');
const client = new upyun.Client(service);
const name = '<%= options.name %>'
const year = new Date().getFullYear();
const month = `${new Date().getMonth() + 1}`.padStart(2, 0);
const uploadDirType = ['js', 'css'];
let uploadObj = {};

// 文件上传
const upload = () => {
  const obj = uploadObj
  for (let key in obj) {
    fs.readFile(obj[key], (err, data) => {
      if (err) {
        return console.error(err);
      }
      client.putFile(`/huodong/build/${year}/${month}/${name}/${obj[key]}`, data.toString()).then((res) => {
        if (res) {
          console.log(`${key}上传成功！`);
        } else {
          console.error(`${key}上传失败`);
        }
      })
    })
  }
}

let isFirst = true
let deleteArr = []
// 递归删除文件
const recursiveCheckFile = async (path, isLastIndex = false) => {
  const res = await client.listDir(path)
  if (res && res.files) {
    if (!res.files.length && isLastIndex) {
      deleteDir()
      return
    }
    for (let index = 0; index < res.files.length; index++) {
      const item = res.files[index]
      if (item.type === 'N') {
        deleteArr.push(`${path}/${item.name}`)
        if (isLastIndex && index === res.files.length - 1) {
          // 最后一个文件则开始删除
          deleteDir()
        }
      } else if (item.type === 'F') {
        // 文件夹则继续递归
        if (isFirst && index === res.files.length - 1) {
          // 是否最后一个文件夹
          isFirst = false
          isLastIndex = true
        }
        await recursiveCheckFile(`${path}/${item.name}`, isLastIndex)
      }
    }
  }
}

const deleteDir = () => {
  const promises = deleteArr.map((path) => {
    return client.deleteFile(path);
  });

  // 同时删除，删除完则进行上传
  Promise.all(promises).then((posts) => {
    posts.forEach((item, index) => {
      if (item) {
        console.log(`${deleteArr[index]}删除成功！`)
      } else {
        console.error(`${deleteArr[index]}删除失败`)
      }
    })
    upload()
  }).catch((reason) => {
    console.error('删除失败', reason)
  });
}

// 查又拍云文件
const checkUpyunDir = () => {
  client.listDir(`/huodong/build/${year}/${month}/${name}`).then((res) => {
    if (res && res.files) {
      // const hasDir = res.files.findIndex(item => item.name === 'dist') > -1
      // if (hasDir) {
      //   // 如果有dist文件夹则需要删除dist文件夹下的文件
      //   recursiveCheckFile(`/huodong/build/${year}/${month}/${name}/dist`)
      // } else {
      //   upload()
      // }
      upload()
    } else {
      upload()
    }
  })
}

fs.readdir('dist', (err, files) => {
  if (err) {
    return console.error(err);
  }

  // 只上传js、css文件夹下的文件
  const uploadDir = files.filter(item => uploadDirType.indexOf(item) > -1)
  uploadDir.forEach((file, index) => {
    fs.readdir(`dist/${file}`, (_err, _files) => {
      if (_err) {
        return console.error(_err);
      }
      _files.forEach((_file, _index) => {
        // 上传文件，key:文件名 value:文件路径
        uploadObj[_file] = `dist/${file}/${_file}`;
        if (index === uploadDir.length - 1 && _index === _files.length - 1) {
          checkUpyunDir()
        }
      });
    });
  });
});
