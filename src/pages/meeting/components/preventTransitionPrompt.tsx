import React from 'react';
import { Prompt } from 'react-router';
import cuid from 'cuid';

class PreventTransitionPrompt extends React.Component {
  /**
   * Dialog state
   */
  state = { open: false };
  __trigger: symbol;

  constructor() {
    // @ts-expect-error check type
    super();

    this.__trigger = Symbol.for(`__PreventTransitionPrompt_${cuid()}`);
  }

  /**
   * Attach global dialog trigger for this component
   * instance to our Symbol trigger
   */
  componentDidMount() {
    // @ts-expect-error check type
    window[this.__trigger] = this.show;
  }

  /**
   * Ensure we clean up and remove the reference
   * from the global object
   */
  componentWillUnmount() {
    // @ts-expect-error check type
    delete window[this.__trigger];
  }

  render() {
    // @ts-expect-error check type
    const { when } = this.props;

    return (
      <React.Fragment>
        {/* @ts-expect-error check type */}
        <Prompt when={when} message={this.handleTransition} />
      </React.Fragment>
    );
  }

  /**
   * Show the dialog. Invoked primarily from React Router transition
   * handler getUserConfirmation.
   *
   * @param allowTransitionCallback A function that accepts a flag whether or not to allow the route transition
   */
  show = (allowTransitionCallback: (arg0: boolean) => void) => {
    // @ts-expect-error check type
    this.props.openModal(() => allowTransitionCallback(false));
    // this.setState({ open: true }, () => allowTransitionCallback(false));
  };

  /**
   * Handles the Router transition. Returns true if allowed
   * or the dialog trigger key to enable the dialog.
   *
   * This would be a good candidate to allow optionally
   * being passed as a callback prop to let
   * caller decide if transition is allowed.
   */
  handleTransition = () => {
    return Symbol.keyFor(this.__trigger);
  };
}

export default PreventTransitionPrompt;
