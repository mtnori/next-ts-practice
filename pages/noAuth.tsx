import * as React from 'react';

import withRoot from '../src/hoc/withRoot';

// Props

const noAuth = () => <p>ページを表示する権限がありません</p>;

export default withRoot({})(noAuth);
