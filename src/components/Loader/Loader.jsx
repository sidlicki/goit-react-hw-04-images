import { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <MagnifyingGlass
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{ margin: 'auto' }}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#f9ffc0"
        color="#645be1"
      />
    );
  }
}
