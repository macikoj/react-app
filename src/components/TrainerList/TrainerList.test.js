import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import TrainerList from './TrainerList'
import  IoIosBackspace  from "react-icons/io";

configure({adapter: new Adapter()})

describe('Trainer list tests  ',()=>{





    it('should render 2 Trainers',()=>{
        
       let wrapper =shallow(<TrainerList onIconClick={()=>{}} trainers={  [
        {Id:1,

        name:"t",
        surname:"w"
        },       
         {Id:1,

            name:"t",
            surname:"w"
            }

    ]}
    />)
        expect(wrapper.find(IoIosBackspace)).toHaveLength(3);



    })


});