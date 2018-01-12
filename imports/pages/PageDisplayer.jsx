import React, { Component } from "react";
import { DynamicPages } from "/imports/api/dynamic_pages/dynamic_pages";
import ContactPageForm from "/imports/components/ContactPageForm";
import { withTracker } from "meteor/react-meteor-data";
import { Grid, Header } from "semantic-ui-react";

export class PageDisplayer extends Component {
  render() {
    const { loading, page } = this.props;

    if (!loading) {
      return (
        <Grid stackable>
          <Grid.Column
            width={16}
            style={{
              backgroundImage:
                "url(" +
                (page.image_url
                  ? page.image_url
                  : "https://i.ytimg.com/vi/g7ZnOq-o7rc/hqdefault.jpg") +
                ")"
            }}
            className="page-header wow bounceIn"
          />
          <Grid.Column width={16} className="center-align">
            <Header as="h1" className="wow fadeInUp">
              {page.title}
            </Header>
            <p className="wow fadeInUp">{page.description}</p>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </Grid.Column>
          <ContactPageForm pageId={page._id} />
        </Grid>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

export default (PageDisplayerContainer = withTracker(({ match }) => {
  const { page_id } = match.params;
  const pagePublication = Meteor.subscribe("dynamic_pages.by_id", page_id);
  const loading = !pagePublication.ready();
  const page = DynamicPages.findOne({ _id: page_id });
  return {
    loading,
    page
  };
})(PageDisplayer));
