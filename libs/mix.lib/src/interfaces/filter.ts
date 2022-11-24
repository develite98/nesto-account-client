export interface IFilter {
  title: string;
  key: string;
  options?: { label: string; value: string }[];
  type: 'input' | 'date' | 'select';
}
