import {makeStyles} from "@material-ui/core/styles";
import heroImage from "../media/marten-bjork-6dW3xyQvcYE-unsplash.jpg";

export const useStyles = makeStyles(theme =>({
    postslist:{
        marginTop: 30,
        marginLeft: 30,
        width: '100%',
    },
    singlepost:{
        marginBottom: 20,
        padding: 10,
    },
    profileicon:{
        width: theme.spacing(6),
        height: theme.spacing(6),
        display: 'inline-flex',
        position:'relative',
    },
    authorbox:{
        display:'flex',
        position:'relative',
    },
    authorinfo:{
        display:'inline',
        position:'relative',
        marginLeft: '10px',
        marginTop: '-5px',
    },
    text:{
        fontSize: '80%',
        lineHeight:'2px',
    },
    title:{
        lineHeight:'2px',
    },
    postbuttons:{
        paddingTop:'1px',
        paddingBottom:'1px',
    },
    iconbuttons:{
        marginRight:'4px',
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
        marginTop: "-150px"
    },
    textPadding: {
        padding: theme.spacing(2, 4, 3),
        justifyContent: 'center',
    },
    loadmore:{
        position: 'absolute',
        right: '48%',
    },
    popupHeader: {
        padding: theme.spacing(2, 4, 3),
        backgroundColor: "#3f51b5",
        color: "white"
    },
    textfield: {
        background: 'white',
        width: '100%',
        marginLeft: 30,
        marginTop:0,
    },
    titlecreatepost: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
        paddingLeft: 10,
    },
    postbutton:{
        marginLeft:'30px !important',
        marginTop: '0px !important',
        marginBottom: '0px !important',
        marginRight: '0px !important',
        width:'100%',
        borderRadius: '0px',
    },
    createpost:{
        marginTop:30,
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
        textAlign:'center',
        marginBottom:'20%',
    },
    iconprofileFeed: {
        display: 'inline-flex',
        width: theme.spacing(7),
        height: theme.spacing(7),
        fontSize: '150%',
    },
    userinfo: {
        paddingTop: '10px',
        textAlign: 'center',
    },
    gridfeed: {
        padding: '0px !important',
    },
    textprofileFeed:{
        fontSize: '90%',
        lineHeight:'2px',
    },
    rootFeed: {
        background: 'rgb(241,238,238)',
        display: 'inline-block',
        height: 'auto',
        minHeight: '1500px',
        width:'100%',
        paddingTop: '30px',
        paddingLeft: 200 ,
        paddingRight: 200 ,
    },
    columnFeedCenter:{
        float: 'left',
        width: '50%',
        backgroundColor: 'rgb(241,238,238)',
        height: 'auto',
    },
    columnFeedSides: {
        float: 'left',
        width: '25%',
        backgroundColor: 'rgb(241,238,238)',
        height: '60em',
        justifyContent: 'center',
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
        height:'2000px',
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
        height:150,
        background: 'blue',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    userinfoProfile: {
        paddingLeft:'10px',
        paddingTop:'10px',
    },
    notificationCopied: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
