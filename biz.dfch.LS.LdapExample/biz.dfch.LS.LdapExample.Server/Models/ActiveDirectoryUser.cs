using System;
using System.ComponentModel.DataAnnotations;

namespace LightSwitchApplication.Models
{
    public class ActiveDirectoryUser
    {
        [Key]
        public string cn { get; set; }
        public string description { get; set; }
        public string distinguishedName { get; set; }
        public int groupType { get; set; }
        public string name { get; set; }
        public string sn { get; set; }
        public string givenName { get; set; }
        public string department { get; set; }
        public string displayName { get; set; }
        public string mail { get; set; }
        public string objectGUID { get; set; }
        public string objectSID { get; set; }
        public string sAMAccountName { get; set; }
        public int sAMAccountType { get; set; }
        public Int64 uSNChanged { get; set; }
        public Int64 uSNCreated { get; set; }
        public DateTime whenChanged { get; set; }
        public DateTime whenCreated { get; set; }
    }
}