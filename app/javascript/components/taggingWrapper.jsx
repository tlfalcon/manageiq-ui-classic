import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { TaggingWithButtonsConnected, taggingApp } from '@manageiq/react-ui-components/dist/tagging';
import '@manageiq/react-ui-components/dist/tagging.css';

class TaggingWrapper extends React.Component {
  constructor(props) {
    super(props);
    ManageIQ.redux.addReducer(taggingApp);
  }

  componentDidMount() {
    this.loadState(this.props.tags);
  }

  loadState = state => this.props.loadState(state);
  reset = () => this.props.reset();
  isLoaded = () => this.props.isLoaded();

  render() {
    if (!this.props.isLoaded) return <Spinner />;
    const { urls } = this.props;
    return (<TaggingWithButtonsConnected
      saveButton={{
          onClick: (assignedTags) => {
            $.post(urls.save_url, { data: JSON.stringify(assignedTags) });
          },
          href: '',
          type: 'button',
          disabled: false,
          description: 'Save',
        }
      }
      cancelButton={{
        onClick: () => { this.reset(); $.post(urls.cancel_url); },
        href: '',
        type: 'button',
        disabled: false,
        description: 'Cancel',
        }
      }
      resetButton={{
        onClick: () => this.reset(),
        href: '',
        type: 'button',
        disabled: false,
        description: 'Reset',
        }
      }
    />);
  }
}

TaggingWrapper.propTypes = {
  reset: PropTypes.func.isRequired,
  loadState: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  ulrs: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadState: state => dispatch({ initialState: state, type: 'UI-COMPONENTS_TAGGING_LOAD_STATE' }),
  reset: () => dispatch({ type: 'UI-COMPONENTS_TAGGING_RESET_STATE' }),
});

const mapStateToProps = ({ tagging }) => ({
  isLoaded: false,
});

const TaggingWrapperConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaggingWrapper);

export default TaggingWrapperConnected;
