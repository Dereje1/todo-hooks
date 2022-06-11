import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TaskDialog from "./TaskDialog";

const props = {
    open: true,
    handleCancel: jest.fn(),
    handleOk: jest.fn(),
}

test('will render', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('will control the name field', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    let nameField = wrapper.find({id: 'name'})
    expect(nameField.props().value).toBe('')
    nameField.props().onChange({target:{value:'stub-name'}})
    nameField = wrapper.find({id: 'name'})
    expect(nameField.props().value).toBe('stub-name')
})

test('will control the description field', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    let descriptionField = wrapper.find({id: 'description'})
    expect(descriptionField.props().value).toBe('')
    descriptionField.props().onChange({target:{value:'stub-description'}})
    descriptionField = wrapper.find({id: 'description'})
    expect(descriptionField.props().value).toBe('stub-description')
})

test('will send field values to parent on Ok click', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    let nameField = wrapper.find({id: 'name'})
    let descriptionField = wrapper.find({id: 'description'})
    nameField.props().onChange({target:{value:'stub-name'}})
    descriptionField.props().onChange({target:{value:'stub-description'}})
    const okButton = wrapper.find('ForwardRef(Button)').at(1)
    okButton.props().onClick();
    expect(props.handleOk).toHaveBeenCalledWith({"description": "stub-description", "name": "stub-name"})
})