import React, {Component} from 'react';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages'
import { withTracker } from 'meteor/react-meteor-data'
import { Grid, Header } from 'semantic-ui-react';
import TinyMCE from 'react-tinymce';

export class PageDisplayer extends Component {

    render(){
        const {loading, page, content, commentaire} = this.props

        if(!loading){
            return (
                <Grid stackable>
                    <Grid.Column
                        width={16}
                        style={{backgroundImage: "url(" + (page.image_url ? page.image_url : 'https://i.ytimg.com/vi/g7ZnOq-o7rc/hqdefault.jpg') + ")"}}
                        className="page-header wow bounceIn"
                    >
                    </Grid.Column>
                    <Grid.Column width={16} className="center-align">
                        <Header as='h1' className="wow fadeInUp">{page.title}</Header>
                        <p className="wow fadeInUp">{page.description}</p>
                        <div dangerouslySetInnerHTML={{__html: page.content }}></div>
                    </Grid.Column>
                    <Grid.Column width={14} className="commentaire">
                    <h3 className="left">Commentaires</h3>
                    <div className="box-comments">
                    <h4 className="pseudo-comm"> Gros LoLo</h4>
                    <p>texte pour réaliser un livre spécimen de polices de texte.
                    Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique
                    informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années
                    1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment,
                    par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p>
                    </div>
                        <h3>Laisser un commentaire</h3>
                          <TinyMCE onChange={this.handleContent} content={content} />
                    </Grid.Column>
                </Grid>
            )
        }else{
            return <div>loading</div>
        }
    }
}

export default PageDisplayerContainer = withTracker(({match}) => {
    const {page_id} = match.params
    const pagePublication = Meteor.subscribe('dynamic_pages.by_id', page_id)
    const loading = !pagePublication.ready()
    const page = DynamicPages.findOne({_id: page_id})
    return {
        loading,
        page
    }
})(PageDisplayer)
