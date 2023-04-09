import  express  from "express";
import { getDataStatus,postRegister,postDataStatus,postLogin,postDataListFriend,postDataMessenger,postDataChat,getDataChat,postCreateRoomChat} from "../controllers/controller.js";

const router = express.Router()


router.get('/status',getDataStatus)

router.get('/groupChat',getDataChat)
router.post('/status',postDataStatus)
router.post('/login',postLogin)
router.post('/register',postRegister)
router.post('/friend',postDataListFriend)
router.post('/messenger',postDataMessenger)
router.post('/groupChat',postDataChat)
router.post('/roomChat',postCreateRoomChat)



export default router