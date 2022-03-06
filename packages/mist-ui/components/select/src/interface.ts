import type { Key } from '../../_utils/type';
import type { RawValueType } from './BaseSelect';

export interface FlattenOptionData<OptionType> {
  label?: any;
  data: OptionType;
  key: Key;
  value?: RawValueType;
  groupOption?: boolean;
  group?: boolean;
}
