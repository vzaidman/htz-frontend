// @flow
/* global fetch */
import React from 'react';

import type { Node, } from 'react';

type State = {
  loading: boolean,
  data: any,
  url: string,
};

type Props = {
  url: string,
  method?: string,
  render: ({ data: any, }) => Node,
}

class FetchData extends React.Component<Props, State> {
  static defaultProps = {
    method: 'GET',
  };

  state = {
    loading: true,
    data: null,
    url: '',
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { url: nextUrl, } = nextProps;
    const { url: prevUrl, } = prevState;
    return nextUrl !== prevUrl
      ? {
        url: nextUrl,
        loading: true,
      }
      : prevState;
  }

  fetchData: () => void = () => {
    const { url, method, } = this.props;
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', },
    })
      .then(res => res.json())
      .then(data => (
        this.setState({
          data,
          loading: false,
        })
      ))
      .catch(err => console.log(err));
  };

  render() {
    const { loading, data, } = this.state;
    if (loading) this.fetchData();
    const { render, } = this.props;
    return data
      ? render(data)
      : null;
  }
}

export default FetchData;
