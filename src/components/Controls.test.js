import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Controls from "./Controls";

const props = {
    setOpenTaskDialog: jest.fn(),
    setFilterSetting: jest.fn(),
    filterSetting: 'all'
}

test('will render', () => {
    const wrapper = shallow(<Controls {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('will set the filter status to complete',()=>{
    const updatedProps = {...props, filterSetting: 'completed'}
    const wrapper = shallow(<Controls {...updatedProps} />)
    let completedButton = wrapper.find({id: 'completed-tasks'})
    completedButton.props().onClick();
    expect(props.setFilterSetting).toHaveBeenCalledWith('completed')
    expect(completedButton.props().sx.border).toBe('.5px solid black')
})

test('will set the filter status to active',()=>{
    const updatedProps = {...props, filterSetting: 'active'}
    const wrapper = shallow(<Controls {...updatedProps} />)
    const activeButton = wrapper.find({id: 'active-tasks'})
    activeButton.props().onClick();
    expect(props.setFilterSetting).toHaveBeenCalledWith('active')
    expect(activeButton.props().sx.border).toBe('.5px solid black')
})

test('will set the filter status to all',()=>{
    const updatedProps = {...props, filterSetting: 'all'}
    const wrapper = shallow(<Controls {...updatedProps} />)
    const allButton = wrapper.find({id: 'all-tasks'})
    allButton.props().onClick();
    expect(props.setFilterSetting).toHaveBeenCalledWith('all')
    expect(allButton.props().sx.border).toBe('.5px solid black')
})