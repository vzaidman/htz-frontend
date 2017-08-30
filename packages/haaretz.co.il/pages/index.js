import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import { fetchTopStories } from '../api/articles';
import Logo from '../components/Logo/Logo';

export default class HomePage extends React.Component {
  static async getInitialProps({ query }) {
    return await fetchTopStories();
  }

  render() {
    return (
      <MainLayout>
        <Logo duotone />
        <h1>Top Stories</h1>
        <ul>
          {this.props.stories.map(story =>
            <li key={story.id}>
              <Link
                as={`/${story.section}/${story.id}`}
                href={`/article?section=${story.section}&id=${story.id}`}
              >
                <a>
                  {story.title}
                </a>
              </Link>
            </li>
          )}
        </ul>
      </MainLayout>
    );
  }
}
