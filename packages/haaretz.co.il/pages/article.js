import { Article } from '@haaretz/htz-components'
import { fetchArticle } from '../api/articles'
import MainLayout from '../layouts/MainLayout'
import Logo from '../components/Logo/Logo'

export default class ArticlePage extends React.Component {
  static async getInitialProps({ query }) {
    return await fetchArticle(query.section, query.id)
  }

  render() {
    return (
      <MainLayout>
        <Logo duotone />
        <Article {...this.props} />
      </MainLayout>
    )
  }
}
