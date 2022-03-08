import styled from "styled-components";

export const TableAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  line-height: 16px;

  span {
    margin: 0 5px;
  }
  svg {
    cursor: pointer;
    color: #555555;
    transition: all 0.3s;
    :hover {
      color: #26c6da;
    }
  }
`;
