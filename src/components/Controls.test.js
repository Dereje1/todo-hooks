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

test('will signal to open the taskDialog when adding a task', () => {
    const wrapper = shallow(<Controls {...props} />)
    let addTaskButton = wrapper.find({ id: 'add-task' })
    addTaskButton.props().onClick();
    expect(props.setOpenTaskDialog).toHaveBeenCalledWith(true)
})

test('will set the filter status to complete', () => {
    const updatedProps = { ...props, filterSetting: 'completed' }
    const wrapper = shallow(<Controls {...updatedProps} />)
    let completedButton = wrapper.find({ id: 'completed-tasks' })
    completedButton.props().onClick();
    expect(props.setFilterSetting).toHaveBeenCalledWith('completed')
    expect(completedButton.props().sx.background).toBe('#e8e6e6')
})

test('will set the filter status to active', () => {
    const updatedProps = { ...props, filterSetting: 'active' }
    const wrapper = shallow(<Controls {...updatedProps} />)
    const activeButton = wrapper.find({ id: 'active-tasks' })
    activeButton.props().onClick();
    expect(props.setFilterSetting).toHaveBeenCalledWith('active')
    expect(activeButton.props().sx.background).toBe('#e8e6e6')
})

test('will set the filter status to all', () => {
    const updatedProps = { ...props, filterSetting: 'all' }
    const wrapper = shallow(<Controls {...updatedProps} />)
    const allButton = wrapper.find({ id: 'all-tasks' })
    allButton.props().onClick();
    expect(props.setFilterSetting).toHaveBeenCalledWith('all')
    expect(allButton.props().sx.background).toBe('#e8e6e6')
})