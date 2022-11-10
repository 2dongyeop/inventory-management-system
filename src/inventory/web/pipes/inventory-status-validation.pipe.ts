import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { InventoryStatus } from '../inventory-status.enum';

export class InventoryStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [InventoryStatus.NONSALE, InventoryStatus.ONSALE];

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }

  transform(value: string, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `${value}은(는) 선택지에 없는 상태 옵션입니다.`,
      );
    }

    return value;
  }
}
