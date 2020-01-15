import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

class ListItem extends React.Component {
    render() {
        return  <li data-role={this.props.item.header ? "list-divider" : ""}>
            {this.props.item.title}
        </li>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMore: true,
            data: [{
                id: 'header',
                header: true,
                title: 'Top Rated Movies'
            }]
        };

        this.getMovies();
    }

    getMovies = () => {
        const data = this.state.data.slice(0);

        if (this.list) {
            this.setState({
                showMore: false
            });
            this.list.instance.showLoading();
        }

        mobiscroll.util.getJson('https://trial.mobiscroll.com/loadmore/?length=' + (data.length + 9), (result) => {
            for (let i = 0; i < result.length; i++) {
                const item = result[i];
                data.push({
                    id: item.id,
                    title: item.title
                });
            }

            this.list.instance.hideLoading();

            this.setState({
                showMore: true,
                data: data
            });
        }, 'jsonp');
    }

    setRef = (comp) => {
        this.list = comp;
    }

    render() {
        return (
            <div className="md-top-movies">
                <mobiscroll.Listview
                    ref={this.setRef}
                    itemType={ListItem}
                    data={this.state.data}
                    theme="ios"
                    themeVariant="light"
                    lang="es"
                    animateAddRemove={false}
                    striped={true}
                    swipe={false}
                    enhance={true}
                />
                <mobiscroll.Form className="mbsc-padding" theme="ios"  themeVariant="light">
                    <div className="mbsc-btn-group-block">
                        <mobiscroll.Button onClick={this.getMovies} style={{ display: (this.state.showMore && this.state.data.length < 101) ? 'block': 'none'}}>
                            Load more
                        </mobiscroll.Button>
                    </div>
                </mobiscroll.Form>
            </div>
        );
    }
}