import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {


  renderField(field){
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        { field.meta.error }
      </div>
    );
  }

  render(){
    return (
      <form>
        <Field
          label="Title for Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
      </form>
    );
  }
}

function validate(values){
  const errors = {};
  const {title, categories, content} =  values;
  
  if (!title && !title.length > 4){
    errors.title = "Enter a title atleast 3 characters long";
  }
  if (!categories){
    errors.categories = "Enter some categories";
  }
  if (!content){
    errors.content = 'Enter some content please';
  }
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);