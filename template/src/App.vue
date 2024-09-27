<template>
  <% if (options.animateType === 'fade') { %>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  <% } else { %>
  <router-view></router-view>
  <% } %>
</template>
<% if (options.isUseScriptSetup === 'yes') { %>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import { mutations } from '@/common/store'
import { getActinfo } from '@/common/fetch'

const instance = getCurrentInstance()
const {
  proxy: { nativeService, share }
} = instance

const fetchGetActinfo = () => {
  getActinfo().then((res) => {
    const { code, data } = res
    if (code === 0) {
      nativeService.setTitle(data.info.activity_name)
      const shareData = {
        title: data.info.share_title,
        desc: data.info.share_subtitle,
        link: `https://${document.domain}/activity/<%= options.name %>/`,
        imgUrl: data.info.share_image
      }
      share(shareData)
      if (nativeService.isJoyRunwebview()) {
        nativeService.setCloseButtonStatus(true)
      }
      mutations.setActinfo(data)
    }
  })
}

fetchGetActinfo()
</script>
<% } else { %>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app'
})
</script>
<% } %>
<style>
  /* --- reset style --- */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html, body {
    line-height: 1;
    width: 100%;
  }
  body, html {
    font-family: 'FZHei-B01S', 'Hiragino Sans GB', 'Microsoft Yahei', 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, STHeiti, Arial, Helvetica, sans-serif;
  }
  body {
    color: #fff;
    background-color: rgba(0, 0, 0, .75);
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  input {
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  /* 清除select箭头 */
  select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: #FFFFFF;
    text-decoration: none;
  }
  *:focus {
    outline: none;
  }
  * {
    box-sizing: border-box;
  }
  * { -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }
  <% if (options.animateType === 'fade') { %>
  /* router fade */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  <% } %>
  #app {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  /* clear fix */
  .clearfix:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both;
  }
  .clearfix { *zoom: 1; }
  /* -- media query -- */
  @media screen and (max-width: 321px) {
    body {
      font-size: 16px
    }
  }
  @media screen and (min-width: 321px) and (max-width: 400px) {
    body {
      font-size: 17px
    }
  }
  @media screen and (min-width: 400px) and (max-width: 840px) {
    body {
      font-size: 19px
    }
  }
  @media screen and (min-width: 840px) {
    body {
      font-size: 22px
    }
  }
</style>
