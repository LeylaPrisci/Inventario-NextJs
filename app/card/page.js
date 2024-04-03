'use client'
import { MantineProvider } from '@mantine/core';
import { Button, Card, Group, Image, Text, CardSection } from '@mantine/core'
import style from '../estilos/home.module.css'
import Link from 'next/link';

const Cards =()=>{

  return(
    <MantineProvider>
      
    <div className={`${style.cuerpo}`}>
      <h2>municipalidad de Yerba buena</h2>
      <div>
        <Card>
          <CardSection>
          <Image src="https://example.com/your-image.jpg" alt="Image" className={`${style.imagenes}`}  />
          </CardSection>
          
          <Group>
            <Text>Cementerio</Text>
          </Group>
          <div>
            <Button>Entrar</Button>
          </div>
        </Card>   
      </div>
    </div>
    </MantineProvider>
    
  )
};
export default Cards;

/*
 <div>
        <Card>
          <CardSection>
          <Image src="https://example.com/your-image.jpg" alt="Image"  height={60} />
          </CardSection>
          
          <Group>
            <Text>Tribunal</Text>
          </Group>
          <div>
            <Button>Entrar</Button>
          </div>
        </Card>   
      
      </div>

      <div>
        <Card>
          <CardSection>
          <Image src="https://example.com/your-image.jpg" alt="Image"  height={60} />
          </CardSection>
          
          <Group>
            <Text>Seguridad</Text>
          </Group>
          <div>
            <Button>Entrar</Button>
          </div>
        </Card>   
      
      </div>

      <div>
        <Card>
          <CardSection>
          <Image src="https://example.com/your-image.jpg" alt="Image"  height={60} />
          </CardSection>
          
          <Group>
            <Text>transito</Text>
          </Group>
          <div>
            <Button>Entrar</Button>
          </div>
        </Card>   
      
      </div>
      <div>
        <Card>
          <CardSection>
          <Image src="https://example.com/your-image.jpg" alt="Image"  height={60} />
          </CardSection>
          
          <Group>
            <Text>Rentas</Text>
          </Group>
          <div>
            <Button>Entrar</Button>
          </div>
        </Card>   
      
      </div>
      <div>
        <Card>
          <CardSection>
          <Image src="https://example.com/your-image.jpg" alt="Image"  height={60} />
          </CardSection>
          
          <Group>
            <Text>Turismo</Text>
          </Group>
          <div>
            <Button>Entrar</Button>
          </div>
        </Card>   
      
      </div>
 */