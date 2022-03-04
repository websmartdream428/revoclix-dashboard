export interface LoginFormProps {
  type?: string | undefined;
  label?: string | undefined;
  name?: string | undefined;
  value?: string | undefined;
  error?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
