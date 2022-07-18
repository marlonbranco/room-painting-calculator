import { useState } from 'react';
import { useForm,  SubmitHandler, Resolver  } from "react-hook-form";
import {
    Container,
    Button,
    UnorderedList,
    WallsList,
    List,
    Input,
    WallsDiv
  } from "./styles";
import { api } from "../../services/api";


type IWallInput = {
    height: number;
    width: number;
}

type IFormInput = {
    walls: IWallInput[],
    numberOfDoors: number;
    numberOfWindows: number;
    
}


// const resolver: Resolver<IWallInput, IFormInput> = async (value) => {
//     return {
//       values: value.height ? values : {},
//       errors: !values.walls
//         ? {
//             firstName: {
//               type: 'required',
//               message: 'This is required.',
//             },
//           }
//         : {},
//      values: value.
//     };
//   };

const convertToNumber = ({height, width}: IWallInput)  =>{
    return {
        height: Number(height),
        width: Number(width)
    }
}

const parseFormData = (data: IFormInput) => {
    const {walls, numberOfDoors, numberOfWindows} = data;
    const parsedWalls = walls.map(convertToNumber);
    const parsedNumberOfDoors = Number(numberOfDoors);
    const parsedNumberOfWindows = Number(numberOfWindows);
    return { 
        walls: parsedWalls, 
        numberOfDoors: parsedNumberOfDoors, 
        numberOfWindows: parsedNumberOfWindows 
    }

}

const Calculator  = () => {
    const [wallsData, useWallsData] = useState<IWallInput[]>([
        { height: 0,width: 0 },
        { height: 0,width: 0 },
        { height: 0,width: 0 },
        { height: 0,width: 0 },
    ]);
    const [loading, setLoading] = useState(false);

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();


    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true);
        const parsedData = parseFormData(data)
        await api.post('/calculator/buckets', parsedData).then(res => {
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
                            
                            {wallsData.map((item, i) => (
                                <WallsList key={i}>
                                    <label>Height:</label>
                                    <Input key={item.height} {...register(`walls.${i}.height`)}/>
                                </WallsList>
                            ))}
                        </div> 
                        <div  className="width">
                        {wallsData.map((item, i) => (
                            <WallsList key={i}>
                                <label>Width:</label>
                                <Input key={item.width} {...register(`walls.${i}.width`)}/>
                            </WallsList>
                        ))}
                        </div>                   
                    </WallsDiv>
                    
                    <List>
                        <label>Number of Doors:</label>
                        <Input {...register("numberOfDoors")}/>
                    </List>
                    <List>
                        <label>Number of Windows:</label>
                        <Input {...register("numberOfWindows")}/>
                    </List>
                    </UnorderedList>
            <Button type="submit">Submit</Button>
            </form>

        </Container>
    )
}

export default Calculator;