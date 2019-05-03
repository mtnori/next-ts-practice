/**
 * @fileoverview Company Model
 */
import { Record, RecordOf } from 'immutable';

interface CompanyProps {
  id: number | null;
  name: string;
}

const defaultValues = {
  id: null,
  name: ''
};

export type CompanyRecord = RecordOf<CompanyProps>;

const makeCompany = Record(defaultValues);
export default {
  makeCompany
};
