import styled from "styled-components";

export const Container = styled.button`
  width: 200px;
  height: 50px;

  display: flex;
  align-items: center;

  border-radius: 6px;
  background: #1550ff;

  transition: all ease 0.3s;

  &:hover {
    opacity: 0.9;
  }
`

export const IconArea = styled.div`
  height: inherit;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 15px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`

export const Icon = styled.img`
  height: 20px;
`

export const Label = styled.div`
  height: inherit;
  color: #FFF;

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 20px;
`