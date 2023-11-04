import { Component } from 'react';
import css from './LoadMoreButton.module.css';

export class LoadMoreButton extends Component {
  render() {
    return (
      <button className={css.Button} onClick={this.props.onClick}>
        Load More
      </button>
    );
  }
}
