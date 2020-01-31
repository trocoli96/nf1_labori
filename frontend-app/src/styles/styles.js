import {makeStyles} from "@material-ui/core/styles";
import heroImage from "../media/marten-bjork-6dW3xyQvcYE-unsplash.jpg";

export const useStyles = makeStyles(theme => ({
    postslist: {
        marginTop: '30px !important',
        marginLeft: '30px !important',
        width: '100% !important',
    },
    singlepost: {
        marginBottom: 20,
        padding: 10,
    },
    profileicon: {
        width: `${theme.spacing(7)}px !important`,
        height: `${theme.spacing(7)}px !important`,
        display: 'inline-flex !important',
        position: 'relative !important',
        fontStyle: 'normal',
    },
    authorbox: {
        display: 'flex !important',
        position: 'relative !important',
    },
    menuposts: {
        display: 'flex !important',
        position: 'absolute !important',
        right: '-0.5em',
        marginTop: '-1em',
    },
    authorinfo: {
        display: 'inline !important',
        position: 'relative !important',
        marginLeft: '10px !important',
        marginTop: '-5px !important',
    },
    text: {
        fontSize: '80%',
        lineHeight: '2px',
        color: 'grey'
    },
    title: {
        lineHeight: '2px',
        color: 'black',
    },
    subtitle: {
        fontSize:'90%',
        lineHeight: '2px',
        color: 'grey',
    },
    postbuttons: {
        paddingTop: '1px',
        paddingBottom: '1px',
    },
    iconbuttons: {
        marginRight: '0px',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '0px solid #000',
        boxShadow: theme.shadows[5],
        top: "50%",
        left: "50%",
        marginLeft: "-200px",
        marginTop: "-350px"
    },
    textPadding: {
        padding: theme.spacing(2, 4, 3),
        justifyContent: 'center',
    },
    loadmore: {
        position: 'absolute !important',
        right: '48% !important',
    },
    popupHeader: {
        padding: theme.spacing(2, 4, 3),
        backgroundColor: "#3f51b5",
        color: "white"
    },
    textfield: {
        background: 'white !important',
        width: '100% !important',
        marginLeft: '30px !important',
        marginTop: 0,
    },
    titlecreatepost: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
        paddingLeft: 10,
    },
    postbutton: {
        marginLeft: '30px !important',
        marginTop: '0px !important',
        marginBottom: '0px !important',
        marginRight: '0px !important',
        width: '100%',
        borderRadius: '0px',
    },
    createpost: {
        marginTop: '30px !important',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    titleheader: {
        flexGrow: 1,
    },
    profile: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        width: '100%',
        margin: 0,
    },
    photocover: {
        textAlign: 'center',
        marginBottom: '20%',
    },
    iconprofileFeed: {
        display: 'inline-flex  !important',
        width: `${theme.spacing(7)}px !important`,
        height: `${theme.spacing(7)}px !important`,
        fontSize: '150% !important',
    },
    userinfo: {
        paddingTop: '10px',
        textAlign: 'center',
    },
    gridfeed: {
        padding: '0px !important',
    },
    textprofileFeed: {
        fontSize: '90%',
        lineHeight: '2px',
    },
    rootFeed: {
        background: 'rgb(241,238,238)',
        display: 'inline-block !important',
        height: 'auto !important',
        minHeight: '1500px !important',
        width: '100% !important',
        paddingTop: '30px !important',
        paddingLeft: '200px !important',
        paddingRight: '200px !important',
    },
    columnFeedCenter: {
        float: 'left !important',
        width: '60% !important',
        backgroundColor: 'rgb(241,238,238)',
        height: 'auto !important',
    },
    columnFeedSides: {
        float: 'left !important',
        width: '20% !important',
        backgroundColor: 'rgb(241,238,238)',
        height: '60em !important',
        justifyContent: 'center !important',
    },
    paperSignUp: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatarSignUp: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    formSignUp: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submitSignUp: {
        margin: theme.spacing(3, 0, 2),
    },
    heroBlockHomePage: {
        height: '95vh',
        backgroundImage: 'url(' + heroImage + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    },
    formPaperHomePage: {
        padding: theme.spacing(8, 5),
        height: '100%'
    },
    marginNegativeHomePage: {
        marginTop: '-90px'
    },
    fullHeightHomePage: {
        height: '100% !important'
    },
    maintitleHomePage: {
        fontSize: '38px !important',
        marginBottom: '10px !important'
    },
    subtitleHomePage: {
        fontSize: '22px !important',
        marginBottom: '40px !important'
    },
    rootProfile: {
        background: 'rgb(241,238,238)',
    },
    paperProfile: {
        padding: 2,
        textAlign: 'center',
        color: 'blue',
    },
    profilePaper: {
        padding: theme.spacing(5),
    },
    photocoverProfile: {
        height: 150,
        background: 'blue',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    userinfoProfile: {
        paddingLeft: '10px',
        paddingTop: '10px',
    },
    notificationCopied: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    experience: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)

    },
    userexperience: {
        padding: '10px'
    },
    paperExperience: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '0px solid #000',
        boxShadow: theme.shadows[5],
        top: "50%",
        left: "50%",
        marginLeft: "-350px",
        marginTop: "-300px"
    },
    experienceheader: {
        display: 'flex',
        position: 'relative',
    },
    experienceheaderinfo: {
        display: 'inline',
        position: 'relative',
        marginLeft: '10px',
        marginTop: '-5px',
    },
    experiencebox: {
        marginLeft: 30,
        width: '90%',
    },
    profilebasicinfo: {
        display: 'inline-block',
        width: '80%',
    },
    buttonfollowing: {
        position: 'absolute',
        display: 'inline-block',
        width: '20%',
        paddingLeft: '2em',
    },
    likeCounter: {
        marginLeft: "9px",
        fontWeight: 700
    },
    commentBox: {
        padding: '12px',
        marginTop: '8px',
        backgroundColor: '#f3f6f8 !important'
    },
    nameOnComment: {
        fontSize: '14px',
        fontWeight: 700,
        marginTop: 0,
        marginBottom: 0,
    },
    bodyComment: {
        fontSize: '14px',
        marginBottom: 0,
        marginTop: '2px'
    },
    peopleyoumaybeknow: {
        marginTop: theme.spacing(4),
    },

    avatarSmall: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },

    avatarBig: {
            width: `${theme.spacing(10)}px !important`,
            height: `${theme.spacing(10)}px !important`,
        },

}));
