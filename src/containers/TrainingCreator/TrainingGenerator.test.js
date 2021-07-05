import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import TrainingGenerator from './TrainingGenerator'
import TrainerList from '../../components/TrainerList/TrainerList'
import ReactTestUtils from 'react-dom/test-utils'; // ES6

configure({ adapter: new Adapter() })

describe('TrainingGenerator tests  ', () => {

  it('should render TrainerList', () => {

    const wrapper = shallow(<TrainingGenerator />)

    wrapper.setState({
      selectedTrainersList: [{
        id: 1,
        name: 'Adam',
        surname: 'Żuk'
      },
      {
        id: 2,
        name: 'Kzysztof',
        surname: 'Trach'
      }
      ]
    });
    expect(wrapper.find(TrainerList)).toHaveLength(1);

  })
  it('should render TrainerList with 2 trainers', () => {

    const wrapper = shallow(<TrainingGenerator />)

    wrapper.setState({
      selectedTrainersList: [{
        id: 1,
        name: 'Adam',
        surname: 'Żuk'
      },
      {
        id: 2,
        name: 'Kzysztof',
        surname: 'Trach'
      }
      ]
    });
    expect(wrapper.find(TrainerList.Trainer)).toHaveLength(2);

  })

});