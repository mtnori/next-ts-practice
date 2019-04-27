import * as React from "react";
import { Subtract } from "utility-types";

/**
 * コンポーネントに追加されるProps
 * HOCを使うコンポーネント側で使えるようにexportする
 */
export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterState {
  value: number;
}

// HOCに渡されるコンポーネントが確実にInjectedPropsを含まれるように
// ジェネリックを書く
const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    // Subtractを使い、渡されたコンポーネントのPropsから、HOCでInjectするPropsを削除する
    // そのまま残っているとコンパイルエラーになる
    Subtract<P, InjectedCounterProps>,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0
    };

    increment = () => {
      this.setState(prevState => ({
        value: prevState.value + 1
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value: prevState.value - 1
      }));
    };

    render() {
      const { value } = this.state;
      return (
        <Component
          {...this.props as P}
          value={value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };
export default makeCounter;
