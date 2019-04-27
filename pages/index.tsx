import * as React from "react";
import TextField from "../components/mui/TextField";

const Page: React.FC = () => (
  <div>
    <TextField dateValue={new Date()} required />
  </div>
);
export default Page;
