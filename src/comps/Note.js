import React, { Component } from "react";

export default class Note extends Component {
  render() {
    return (
      <div className='flex flex-col space-y-4'>
        <span className='text-2xl text-left font-bold'>{this.props.title}</span>
        <div className='px-6 py-4'>{this.props.note}</div>
        <div className='flex space-x-5'>
          <span className='text-slate-400 text-xl text-left'>
            Last updated : {this.props.added}
          </span>
          <button
            onClick={() => {
              this.props.func(
                this.props.title,
                this.props.note,
                this.props.added,
                this.props.id
              );
            }}>
            Update
          </button>
        </div>
      </div>
    );
  }
}
