import React from "react";
import SquarePost from "../../Components/SquarePost";
// import MyVerticallyCenteredModal from "../../Components/PopupModal/PupupModalContainer";

//4번 반복을 1fr씩 한다/.. 1fr은 1등분 이라보면됨.. 즉 1:1:1:1 크기로 넣음!
// const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );

const ExplorePresenter = ({
  id,
  user,
  files,
  likeCount,
  commentCount,
  likes,
  isLiked,
  createdAt,
}) => {
  return (
    <>
      <SquarePost
        id={id}
        user={user}
        likeCount={likeCount}
        commentCount={commentCount}
        file={files[0]}
        likes={likes}
        isLiked={isLiked}
        createdAt={createdAt}
      />
    </>
  );
};

// export default class Examples extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//     };
//   }

//   openModal() {
//     this.setState({
//       visible: true,
//     });
//   }

//   closeModal() {
//     this.setState({
//       visible: false,
//     });
//   }

//   render() {
//     return ExplorePresenter();
//     <section>
//       <h1>React-Modal Examples</h1>
//       <input type="button" value="Open" onClick={() => this.openModal()} />
//       <Modal
//         visible={this.state.visible}
//         width="400"
//         height="300"
//         effect="fadeInUp"
//         onClickAway={() => this.closeModal()}
//       >
//         <div>
//           <h1>Title</h1>
//           <p>Some Contents</p>
//           <a href="javascript:void(0);" onClick={() => this.closeModal()}>
//             Close
//           </a>
//         </div>
//       </Modal>
//     </section>;
//   }
// }

export default ExplorePresenter;

// SearchPresenter.propTypes = {
//   searchTerm: PropTypes.string,
//   loading: PropTypes.bool,
// };
