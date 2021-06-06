import { FC, useState, useEffect, useContext } from 'react';
import { filterStateContext } from '../../context/filters';
import { Container, ListItem, QuantityFilter,SortFilter } from '../../components';
//import style from './style.module.scss';

const Home: FC = () => {

  const { currentQuantityItems, downwardSort } = useContext(filterStateContext);

  const sampleData: Array<any> = Array(100)
    .fill(0)
    .slice(0, currentQuantityItems)
    .map((item: any, index: number) => ({
      id: (index + 1).toString(),
      name: 'rodrodrodrod',
      img: 'alt'
    }))

  
  return (
    <>
    <header style={{
      backgroundColor: 'hsl(167, 92%, 20%)',
      paddingTop: '20px',
      paddingBottom: '20px',
    }}>
      <Container>
        <h1 style={{ color: '#ffffff' }}>Github User List</h1>
      </Container>
    </header>
    <main>
      <Container>
        
        <div style={{
          backgroundColor: "#ffffff",
          overflow: 'hidden',
          borderRadius: '5px',
          padding: '20px',
          marginBottom: '40px',
        }}>
          <span>Filters</span>

          <QuantityFilter />

          <SortFilter />
        </div>

        <ol style={{ padding: 0 }}>
          {!!sampleData.length &&
            (downwardSort ? sampleData.reverse() : sampleData)
            .map((item: any) => (
            <ListItem key={item.id}
              userName={item.name + item.id}
              profilePictureSrc={item.img}
            />
          ))}
        </ol>
      </Container>
    </main>
    </>
  )
}

export default Home;