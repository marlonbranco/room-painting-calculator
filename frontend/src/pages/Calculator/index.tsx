import {FC, useState } from 'react';
import { useForm,  SubmitHandler  } from "react-hook-form";
import {
    Container,
    SubtitleText,
    Form,
    FormButton,
    UnorderedList,
    WallsDiv,
    WallsLabel,
    WallsInput,
    Table,
    ErrorText
  } from "./styles";
import { api } from "../../services/api";

import { IRoomInput } from './@types'
import { parseFormData } from './helpers';

const Calculator: FC  = () => {
    const [wallsData] = useState<IRoomInput>({
        walls: [
            { height: '0',width: '0', numberOfDoors: '0', numberOfWindows: '0' },
            { height: '0',width: '0', numberOfDoors: '0', numberOfWindows: '0' },
            { height: '0',width: '0', numberOfDoors: '0', numberOfWindows: '0' },
            { height: '0',width: '0', numberOfDoors: '0', numberOfWindows: '0' },
        ]
    });

    const [response, setResponse] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState({hasError: false, message: ''});
    const { register, handleSubmit, reset } = useForm<IRoomInput>();

    const onSubmit: SubmitHandler<IRoomInput> = async (data) => {
        setLoading(true);
        const walls = parseFormData(data)
        console.log(walls)
        await api.post('/calculator/buckets', walls).then(res => {
            console.log(res);
            setHasError({hasError: false, message: ''});
            setResponse(Object.entries(res.data));
        }).catch(err => {
            const { message } = err.response.data;
            setHasError({hasError: true, message});
            console.log(err.response)
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleFormClear = () => {
        reset(wallsData);
        setHasError({hasError: false, message: ''});
        setResponse(null);
    }

    return (
        <Container>
            <h1>Room Painting Caltulator 📐</h1>
            <SubtitleText>Type in the information of each wall:</SubtitleText>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <UnorderedList>
                    <WallsDiv>
                        <div className="height">
                        {wallsData.walls.map((item, i) => (
                            <li key={i}>
                                <WallsLabel>Height:</WallsLabel>
                                <WallsInput key={item.height} type="number" min="0" step="any" formNoValidate {...register(`walls.${i}.height`)}/>
                            </li>
                        ))}
                        </div> 
                        <div  className="width">
                        {wallsData.walls.map((item, i) => (
                            <li key={i}>
                                <WallsLabel>Width:</WallsLabel>
                                <WallsInput key={item.width} type="number" min="0" step="any" formNoValidate {...register(`walls.${i}.width`)}/>
                            </li>
                        ))}
                        </div>      
                        <div  className="numberOfDoors">
                        {wallsData.walls.map((item, i) => (
                            <li className="doors-number-inputs" key={i}>
                                <WallsLabel>Number of Doors:</WallsLabel>
                                <WallsInput key={item.numberOfDoors} type="number" min="0" step="any" formNoValidate {...register(`walls.${i}.numberOfDoors`)}/>
                            </li>
                        ))}
                        </div>     
                        <div  className="numberOfWindows">
                        {wallsData.walls.map((item, i) => (
                            <li className="windows-number-inputs" key={i}>
                                <WallsLabel>Number of Windows:</WallsLabel>
                                <WallsInput key={item.numberOfWindows} type="number" min="0" step="any" formNoValidate {...register(`walls.${i}.numberOfWindows`)}/>
                            </li>
                        ))}
                        </div>                  
                    </WallsDiv>
                    </UnorderedList>

                    {hasError.hasError ? <ErrorText>{hasError.message}</ErrorText> : null}

                    {!hasError.hasError && response?.length >= 1 ? <Table>
                        <thead>
                            <tr>
                                <th>Buckets</th>
                                {response.map((value: any) => (
                                    <th key={value[0]}>{value[0]} L</th>
                                ))}   
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Amount</td>
                                {response.map((value: any) => (
                                    <td key={value[0]}>{value[1]}</td>
                                ))}      
                            </tr>
                        </tbody>
                    </Table> : null}
                
                {loading 
                ? <FormButton type="submit" className="btn-loading" disabled={loading}>Loading...</FormButton>
                : <FormButton type="submit" className="btn-submit">Calculate</FormButton>}
                {loading 
                ? <FormButton type="reset" className="btn-loading" disabled>Loading...</FormButton>
                : <FormButton type="reset" className="btn-reset" onClick={handleFormClear}>Clear</FormButton>}
            </Form>
            <SubtitleText>Standart measurers of Doors & Windows:</SubtitleText>
            <Table>
                <thead>
                    <tr>
                        <th>Doors</th>
                        <th>Windows</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0.80m x 1.90m</td>
                        <td>2.00m x 1.20m</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default Calculator;