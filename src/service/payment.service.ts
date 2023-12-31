import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repository/auth.repository';
import { PaymentRepository } from '../repository/payment.repository';
import { PaymentDto } from '../dto/payment.dto';
import { Payment } from '../model/payment.entity';
import { PlanRepository } from '../repository/plan.repository';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentRepository)
        private paymentRepository: PaymentRepository,
        @InjectRepository(PlanRepository)
        private planRepository: PlanRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async createPayment(paymentDto: PaymentDto): Promise<void> {
        const user = await this.authRepository.findOne(paymentDto.user_id);
        // let plan;
        const plan = await this.planRepository.findOne(paymentDto.plan_id);
        return this.paymentRepository.createPayment(paymentDto, user, plan);
    }

    async getPayments(): Promise<Payment[]> {
        // const user = await this.authRepository.findOne(paymentDto.user_id);
        // let plan;
        // const plan = await this.authRepository.findOne(paymentDto.plan_id);
        return this.paymentRepository.getPayments();
    }

}
