import styled from 'styled-components';

const shrinkLabel = `
  top: -14px;
  font-size: 12px;
  color: $main-color;
`;

export const FormGroup = styled.div`
  position: relative;
  margin: 45px 0;
`;

export const FormInput = styled.input`
  background: none;
  background-color: white;
  color: $sub-color;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid $sub-color;
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ .form-input-label {
    @include shrinkLabel();
  }
`;

