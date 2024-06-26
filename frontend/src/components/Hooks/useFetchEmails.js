import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSentEmails } from "../../Utils/MailSlice";

const useFetchEmails = () => {
  const token = useSelector((state) => state.auth.isToken);
  const dispatch = useDispatch();

  const fetchSentBoxData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/mail/sentbox`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(setSentEmails(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return { fetchSentBoxData };
};

export default useFetchEmails;
