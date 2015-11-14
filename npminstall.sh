# Get this instance's ID
INSTANCE_ID=$(get_instance_id)
if [ $? != 0 -o -z "$INSTANCE_ID" ]; then
  error_exit "Unable to get this instance's ID; cannot continue."
fi

msg "Checking if instance $INSTANCE_ID is part of an AutoScaling group"
asg=$(autoscaling_group_name $INSTANCE_ID)
if [ $? == 0 -a -n "$asg" ]; then
  msg "Found AutoScaling group for instance $INSTANCE_ID: $asg"

  msg "Attempting to put instance into Standby"
  autoscaling_enter_standby $INSTANCE_ID $asg
  if [ $? != 0 ]; then
      error_exit "Failed to move instance into standby"
  else
      msg "Instance is in standby"
      exit 0
  fi
fi

cd $HOME/projects/wagermetrics-angular

npm install