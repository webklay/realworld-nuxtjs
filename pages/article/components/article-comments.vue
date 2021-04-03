<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea v-model="body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click.prevent="submitComment">
        Post Comment
        </button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options" @click.prevent="removeComment(comment.id)"><i class="ion-trash-a"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getComments, addComment, deleteComment } from '@/api/article'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [], // 文章列表
      body: ''
    }
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async submitComment () {
      const { data } = await addComment(this.article.slug, this.body)
      this.comments.unshift(data.comment)
      this.body = ''
    },
    async removeComment (id) {
      await deleteComment(this.article.slug, id);
      const index = this.comments.indexOf(id) !== -1
      this.comments.splice(index, 1);
      this.body = ''
    }
  }
}
</script>

<style>

</style>
