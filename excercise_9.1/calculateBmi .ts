export const calculateBmi = (height:number, weight:number):string => {
    const bmi = weight/((height/100)**2);
    if (bmi < 18.5)
        return('underweight');
    else if (bmi < 25)
        return('normal');
    else if (bmi < 30)
        return('overweight');
    else
        return('obese');
};

const parse_arg = ():Array<number> => {
    const args = process.argv;//.splice(2, process.argv.length);
    if (args.length !== 2) 
        throw new Error(`Requires two arguments, provided ${args.length}`);
    const result = [Number(args[0]), Number(args[1])];
    if ( (isNaN(result[0])) || (isNaN(result[1])) )
        throw new Error('Arguments must be numbers');
    
    return result;
};

try{ 
    const values = parse_arg();
    console.log(calculateBmi(values[0], values[1]));
}
catch(error:unknown) {
    console.log('There was an error ');
    if (error instanceof Error)
        console.log(error.message);
}