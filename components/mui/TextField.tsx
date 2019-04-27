/**
 * HOCはラップされる側のコンポーネントのPropsを知らない
 */
import * as React from "react";

import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles, {
  WithStyles,
  StyleRules
} from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme: Theme): StyleRules =>
  createStyles({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 400
    }
  });

// ラップ対象のコンポーネントに追加するProps
interface InjectedProps {
  value: string;
}

// Hocが必要とするProps
// ラップされるコンポーネントと同じ名前のPropsを
// 指定するとだめ
// FIXME Omit使えばできる？
interface WithFormikProps {
  dateValue: Date;
}

// InjectedPropsを除いて、WithFormikPropsを足したのが
// ラップ後のコンポーネントが受け取ることができるProps
// 今回だと、Subtract<P, InjectedProps> & WithFormikPropsで、
// 呼び出し元はWithFormikPropsしか渡せないことになる

function withFormik<P extends {}>(
  WrappedComponent: React.ComponentType<P & InjectedProps>
): React.FC<P & WithFormikProps> {
  const result = ({ dateValue, ...props }: P & WithFormikProps) => {
    return (
      <WrappedComponent {...props as any} value={dateValue.toISOString()} />
    );
  };
  return result;
}

// 使うHOC関数の分だけ、InjectedPropsを合成して自身のPropsとして定義する
type Props = TextFieldProps & WithFormikProps & WithStyles<typeof styles>;
const TextField = ({ classes, ...props }: Props) => (
  <MuiTextField {...props} className={classes.textField} />
);

// withStylesとwithFormikでラップする
export default withStyles(styles)(withFormik(TextField));
