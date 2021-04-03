<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="$router.push({ name: 'settings' })"
            >
              <i class="ion-gear-a"></i>
              Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'my' }"
                  :to="{
                    name: 'profile',
                    params: {
                      profile: profile.username,
                    },
                    query: {
                      tab: 'my',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'favorited' }"
                  :to="{
                    name: 'profile',
                    params: {
                      profile: profile.username,
                    },
                    query: {
                      tab: 'favorited',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tagList"
                  :key="tag"
                >
                  {{ tag }}
                </li>
              </ul>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getProfiles } from "@/api/user";
import {
  getArticles,
  deleteFavorite,
  addFavorite,
} from "@/api/article";
export default {
  middleware: "authenticated",
  name: "UserProfile",
  head() {
    return {
      title: `@${this.$route.params.username}--Conduit`,
    };
  },
  watchQuery: ["tab", "page"],
  async asyncData(context) {
    const { tab = "my", page = 1 } = context.query;
    const { username } = context.params;

    const limit = 5;
    const offset = (page - 1) * limit;

    const articleParams =
      tab === "my" ? { author: username } : { favorited: username };

    articleParams.limit = limit;
    articleParams.offset = offset;

    const [profileRes, articlesRes] = await Promise.all([
      getProfiles(username),
      getArticles(articleParams),
    ]);
    const { profile } = profileRes.data;
    const { articles, articlesCount } = articlesRes.data;
    articles.forEach((article) => (article.favoriteDisabled = false));

    return {
      tab,
      limit,
      page,
      profile,
      articles,
      articlesCount,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onFavorite(article) {
      if (!this.user) return this.$router.push("/login");
      article.favoriteDisabled = true; // 禁用点击
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false; // 允许点击
    },
  },
};
</script>

<style>
</style>
