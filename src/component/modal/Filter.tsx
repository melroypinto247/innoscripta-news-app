import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { FilterFormValuesTypes } from '../../pages/Home';
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap'; // Import React Bootstrap components

interface MultiSelectOption {
  value: string|null;
  label: string|null;
}

const FilterModal: React.FC<{ 
  show: boolean; 
  handleClose: () => void; 
  initialData: FilterFormValuesTypes;
  handleSubmit:(values: FilterFormValuesTypes) => void;
  categories:MultiSelectOption[];
  authors:MultiSelectOption[];
  sources:MultiSelectOption[];

}> = ({ show, handleClose, initialData, handleSubmit,categories,authors,sources }) => {

  

  // Validation Schema
  const validationSchema = Yup.object({
    date: Yup.string(),
    sources: Yup.array(),
    categories: Yup.array(),
    authors: Yup.array(),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              {/* Date Field */}
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label htmlFor="date">Date</BootstrapForm.Label>
                <Field type="date" id="date" name="date" className="form-control" />
                <ErrorMessage name="date" component="div" className="text-danger" />
              </BootstrapForm.Group>

              {/* Sources Field */}
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label htmlFor="sources">Sources</BootstrapForm.Label>
                <Select
                  options={sources}
                  isMulti
                  name="sources"
                  value={sources.filter(option =>
                    values.sources.includes(option.value || '')
                  )}
                  onChange={(selectedOptions) =>
                    setFieldValue(
                      'sources',
                      selectedOptions.map(option => option.value)
                    )
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <ErrorMessage name="sources" component="div" className="text-danger" />
              </BootstrapForm.Group>

              {/* Categories Field */}
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label htmlFor="categories">Categories</BootstrapForm.Label>
                <Select
                  options={categories}
                  isMulti
                  name="categories"
                  value={categories.filter(option =>
                    values.categories.includes(option.value || "")
                  )}
                  onChange={(selectedOptions) =>
                    setFieldValue(
                      'categories',
                      selectedOptions.map(option => option.value)
                    )
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <ErrorMessage name="categories" component="div" className="text-danger" />
              </BootstrapForm.Group>

              {/* Authors Field */}
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label htmlFor="authors">Authors</BootstrapForm.Label>
                <Select
                  options={authors}
                  isMulti
                  name="authors"
                  value={authors.filter(option =>
                    values.authors.includes(option.value || "")
                  )}
                  onChange={(selectedOptions) =>
                    setFieldValue(
                      'authors',
                      selectedOptions.map(option => option.value)
                    )
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <ErrorMessage name="authors" component="div" className="text-danger" />
              </BootstrapForm.Group>

              {/* Submit Button */}
              <div className="d-flex justify-content-end">
                <Button className='btn-primary' type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
