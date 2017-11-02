import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { createPost } from '../actions/';

class PostsNew extends Component {


  renderField(field){
    // Nested destructuring
    const { meta : {touched, invalid, error} } = field;
    const className = classnames(
      'form-group',
      { 'has-danger': touched && invalid }
    );

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  onSubmit(values){
    this.props.createPost(values, ()=>{
      this.props.history.push('/');
    });
  }

  render(){
    // Passed by reduxForm; Tells redux-form to handle state/validation then calls our callback for the rest of logic
    const { handleSubmit } = this.props;
    
    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
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
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

/**
 * When you submit/touch a field, redux form validates the field using the validate function
 * Returns an error object; Property names of the object correspond with the `name` of the field
 * Similar to error, values is also an object where its properties corresponds to the `name` of the fields but this time for the value
 * @param {Object} values 
 */
function validate(values){
  const errors = {};
  const {title, categories, content} =  values;
  
  if (!title){
    errors.title = "Enter a title";
  }
  if (!categories){
    errors.categories = "Enter some categories";
  }
  if (!content){
    errors.content = 'Enter some content please';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);