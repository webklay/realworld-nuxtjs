<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <ul v-for="(value, key) in errorText" :key="key" class="error-messages">
          <li>{{ key }} {{ value }}</li>
        </ul>
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.tagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publishArticle, getArticle, updateArticle } from "@/api/article";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  layout: "index",
  data() {
    return {
      article: {
        body: "",
        description: "",
        tagList: "",
        title: "",
      },
      errorText: {},
    };
  },
  head () {
    return {
      title: `Editor - conduit`,
    }
  },
  async mounted() {
    const slug = this.$route.params.slug;
    if (slug) {
      this.slug = slug;
      const { data } = await getArticle(slug);
      this.article = data.article;
    }
  },
  methods: {
    async onSubmit() {
      try {
        // const { data } = await publishArticle({ article: this.article });
        // this.$router.push({
        //   name: "article",
        //   params: {
        //     slug: data.article.slug,
        //   },
        // });
        if (this.slug) {
          const { data } = await updateArticle(this.slug, {article: this.article})
          this.$router.push(`/article/${data.article.slug}`)
        }else {
          const { data } = await publishArticle({
            article: this.article
          })
          this.$router.push(`/article/${data.article.slug}`)
        }

      } catch (error) {
        this.errorText = error.response.data.errors;
        return false;
      }
    },
  },
};
</script>

<style>
</style>
