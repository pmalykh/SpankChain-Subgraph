import { BigInt } from "@graphprotocol/graph-ts"
import {
  HumanStandardToken,
  Transfer,
  Approval
} from "../generated/HumanStandardToken/HumanStandardToken"
import { _Transfer, _Approval } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let entity = _Transfer.load(event.params._value.toHex())

  if (entity == null) {
    entity = new _Transfer(event.params._value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity._from = event.params._from
  entity._to = event.params._to
  entity._value = event.params._value
  entity.save()
}

export function handleApproval(event: Approval): void {
  let entity = _Approval.load(event.params._value.toHex())

  if (entity == null) {
    entity = new _Approval(event.params._value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity._owner = event.params._owner
  entity._spender = event.params._spender
  entity._value = event.params._value
  entity.save()
}
