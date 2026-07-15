import { Router, type IRouter } from "express";
import healthRouter from "./health";
import pagamentoRouter from "./pagamento";

const router: IRouter = Router();

router.use(healthRouter);
router.use(pagamentoRouter);

export default router;
