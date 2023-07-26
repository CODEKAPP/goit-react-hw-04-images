import styled from 'styled-components';

export const ListStyle = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  gap: 4px;
  align-items: center;
  justify-content: center;
  align-content: center;
  list-style: none;
  /* display: grid; */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  margin: 0;
  padding: 0;
`;
export const ItemList = styled.li`
cursor: pointer;
`;
export const ImgList = styled.img`
  width: 300px;
  height: 300px;
  /* width: 100%; */
  height: auto;
  border-radius: 20px;
  margin: 8px;

  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
