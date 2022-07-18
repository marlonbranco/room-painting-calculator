import { useState } from 'react';
import { useForm,  SubmitHandler  } from "react-hook-form";
import {
    Container,
    Button,
    UnorderedList,
    WallsList,
    List,
    Input,
    WallsDiv,
    WallsInput,
    ErrorP
  } from "./styles";
import { api } from "../../services/api";



type IWall = {
    height: string;
    width: string;
    numberOfDoors: string;
    numberOfWindows: string;
}

type IWallInput = {
    walls: IWall[];
}

const convertToNumber = (walls: IWall)  =>{
    const {height, width, numberOfDoors, numberOfWindows} = walls;
    return {
        height: height ? parseFloat(height.replace(/,/g, '.')) : Number(0),
        width: width ? parseFloat(width.replace(/,/g, '.')) : Number(0),
        numberOfDoors: numberOfDoors ? parseFloat(width.replace(/,/g, '.')) : Number(0),
        numberOfWindows: numberOfWindows ? parseFloat(width.replace(/,/g, '.')) : Number(0),
    }
}

const parseFormData = ({ walls }: IWallInput) => {
    const parsedWalls = walls.map(convertToNumber);
    return { 
        walls: parsedWalls, 
    }

}

const Calculator  = () => {
    const [data, useData] = useState<IWallInput>({
        walls: [
            { height: '0',width: '0', numberOfDoors: '0', numberOfWindows: '0' },
            { height: '0',width: '0', numberOfDoors: '0', numberOfWindows: '0' },
            { height: '0',width: '0', numberOfDoors: '0', numberOfWindows: '0' },
            { height: '0',width: '0', numberOfDoors: '0', numberOfWindows: '0' },
        ]
    });
    const [loading, setLoading] = useState(false);

    const { register, formState: { errors }, handleSubmit } = useForm<IWallInput>();


    const onSubmit: SubmitHandler<IWallInput> = async (data) => {
        setLoading(true);
        const walls = parseFormData(data)
        await api.post('/calculator/buckets', { walls }).then(res => {
            console.log(res);
        }).catch(err => console.log(err.response)).finally(() => setLoading(false));
    }

    return (

        <Container>
            <h1>Buckets Caltulator</h1>
            <p>Calculate the Amount of buckets to paint a room</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <UnorderedList>
                    <h4>Walls</h4>

                    <WallsDiv>
                        <div className="height">
                            
                            {data.walls.map((item, i) => (
                                <WallsList key={i}>
                                    <label>Height:</label>
                                    <WallsInput key={item.height} {...register(`walls.${i}.height`, { required: true, min: 2.2 })}/>
                                </WallsList>
                            ))}
                        </div> 
                        <div  className="width">
                        {data.walls.map((item, i) => (
                            <WallsList key={i}>
                                <label>Width:</label>
                                <WallsInput key={item.width} {...register(`walls.${i}.width`, { required: true, min: 0.1 })}/>
                            </WallsList>
                        ))}
                        </div>      
                        <div  className="width">
                        {data.walls.map((item, i) => (
                            <WallsList key={i}>
                                <label>Number of Doors:</label>
                                <WallsInput key={item.numberOfDoors} {...register(`walls.${i}.numberOfDoors`)}/>
                            </WallsList>
                        ))}
                        </div>     
                        <div  className="width">
                        {data.walls.map((item, i) => (
                            <WallsList key={i}>
                                <label>Number of Windows:</label>
                                <WallsInput key={item.numberOfWindows} {...register(`walls.${i}.numberOfWindows`)}/>
                            </WallsList>
                        ))}
                        </div>                  
                    </WallsDiv>
                    </UnorderedList>
            <Button type="submit">Calculate</Button>
            </form>

        </Container>
    )
}

export default Calculator;