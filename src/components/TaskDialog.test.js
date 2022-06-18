import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TaskDialog from "./TaskDialog";

const props = {
    open: true,
    handleCancel: jest.fn(),
    handleOk: jest.fn(),
    editableTask: null
}

test('will render', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('will control the name field and set validation', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    let nameField = wrapper.find({ id: 'name' })
    expect(nameField.props().value).toBe('')
    nameField.props().onChange({ target: { value: 'stub-name' } })
    nameField = wrapper.find({ id: 'name' })
    expect(nameField.props().value).toBe('stub-name')
    expect(nameField.props().error).toBe(false)
    // check for invalid name
    nameField.props().onChange({ target: { value: 'stub' } })
    nameField = wrapper.find({ id: 'name' })
    expect(nameField.props().value).toBe('stub')
    expect(nameField.props().error).toBe(true)
})

test('will control the description field', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    let descriptionField = wrapper.find({ id: 'description' })
    expect(descriptionField.props().value).toBe('')
    descriptionField.props().onChange({ target: { value: 'stub-description' } })
    descriptionField = wrapper.find({ id: 'description' })
    expect(descriptionField.props().value).toBe('stub-description')
})

test('will send field values to parent on Ok click to Add a task', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    let nameField = wrapper.find({ id: 'name' })
    let descriptionField = wrapper.find({ id: 'description' })
    nameField.props().onChange({ target: { value: 'stub-name' } })
    descriptionField.props().onChange({ target: { value: 'stub-description' } })
    const okButton = wrapper.find('ForwardRef(Button)').at(1)
    expect(okButton.props().disabled).toBe(false);
    okButton.props().onClick();
    expect(props.handleOk).toHaveBeenCalledWith({ "description": "stub-description", "name": "stub-name" }, null)
})

test('will disable ok button if validation fails', () => {
    const wrapper = shallow(<TaskDialog {...props} />)
    let nameField = wrapper.find({ id: 'name' })
    nameField.props().onChange({ target: { value: 'stub-name-that-is-too-long' } })
    const okButton = wrapper.find('ForwardRef(Button)').at(1)
    expect(okButton.props().disabled).toBe(true);
})

test('will send field values to parent on Ok click to modify a task', () => {
    const updatedProps = {
        ...props,
        editableTask: {
            "description": "stub-editable-description",
            "name": "stub-editable-name",
            id: "1"
        }
    }
    const wrapper = shallow(<TaskDialog {...updatedProps} />)
    let nameField = wrapper.find({ id: 'name' })
    let descriptionField = wrapper.find({ id: 'description' })
    nameField.props().onChange({ target: { value: 'stub-edited-name' } })
    descriptionField.props().onChange({ target: { value: 'stub-edited-description' } })
    const okButton = wrapper.find('ForwardRef(Button)').at(1)
    okButton.props().onClick();
    expect(props.handleOk).toHaveBeenCalledWith(
        { "description": "stub-edited-description", "name": "stub-edited-name" }, 
        { "description": "stub-editable-description","name": "stub-editable-name",id: "1"}
    )
})